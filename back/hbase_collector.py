from constants import constants as C
import happybase
import logging

LOGGER = logging.getLogger('HBaseExtractor')
LOGGER.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

fh = logging.FileHandler(__name__ + '.log')
fh.setLevel(logging.DEBUG)
fh.setFormatter(formatter)
LOGGER.addHandler(fh)


ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
ch.setFormatter(formatter)
LOGGER.addHandler(ch)

conn = happybase.Connection('fr00nbphbase01')


class HBaseExtractor:
    """
    Получение оригиналов, темплейтов (векторов) и различной метаинформации
    """

    def __init__(self, host, port=9090):
        self.host = host
        self.port = port
        self.conn = happybase.Connection(host)
        self.connected_tables = {}


    def load_tables(self, tables):
        LOGGER.info("Loading HBase tables")
        self.connected_tables = {
            t: conn.table(t) for t in tables
        }

    def tables(self):
        return self.conn.tables()

    def idp_tables(self):
        print([t for t in self.conn.tables() if C.IDP_TABLE_PREFIX in t])

    def users(self, idp_table=C.IDP_DEFAULT_TABLE):
        return [key[0] for key in self.connected_tables[idp_table].scan()]

    def originals(self):
        for key, data in self.connected_tables[C.ORIGINALS_PHOTO_TABLE].scan():
            print(key, data)

    def templates(self, modality=None):
        if modality == 'photo':
            return [(key, data) for key, data in self.connected_tables[C.TEMPLATES_PHOTO_TABLE].scan()]

    def extract_test_originals(self, user_int):
        for _, data in self.connected_tables[C.ORIGINALS_PHOTO_TABLE].rows(user_int + C.HB_UNDERSCORE_DELIM + C.TEST_ORIGINAL_TS):
            print(data)

    def extract_originals(self, user_int):
        result = []
        for _, data in self.connected_tables[C.ORIGINALS_PHOTO_TABLE].scan(row_prefix=user_int):
            result.append(data)
        return result

    def extract_templates(self, user_int):
        photo_row = self.connected_tables[C.TEMPLATES_PHOTO_TABLE].row(user_int)
        # audio_row = self.connected_tables[TEMPLATES_AUDIO_TABLE].row(user) // no modality for now
        results = []
        for v in C.VENDORS:
            results.append(photo_row[v + C.HB_CF_DELIM + C.VENDOR_DATA_CF])
        return results

    def get_internal_user_key_from_idp(self, user, idp_table=C.IDP_DEFAULT_TABLE):
        row = self.connected_tables[idp_table].row(user)
        return row[b'meta:id']


if __name__ == '__main__':
    hb = HBaseExtractor('fr00nbphbase01')
    hb.load_tables(['ids_esia', 'template_photo', 'original_photo'])
    # print(hb.templates(modality='photo'))
    int_k = hb.get_internal_user_key_from_idp(b'1500')
    print(hb.extract_templates(int_k))
    print(hb.extract_originals(int_k))

