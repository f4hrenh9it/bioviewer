IDP_TABLE_PREFIX = b'ids_'
IDP_DEFAULT_TABLE = 'ids_esia'
ORIGINALS_PHOTO_TABLE = "original_photo"
ORIGINALS_AUDIO_TABLE = "original_sound"
TEMPLATES_PHOTO_TABLE = "template_photo"
TEMPLATES_AUDIO_TABLE = "template_sound"

# Vendor info
VENDORS = [b'grisha_photo_1.0.0']
VENDOR_DATA_CF = b'data'

# Byte consts
HB_CF_DELIM = b':'
HB_UNDERSCORE_DELIM = b'_'

# Test data consts
TEST_ORIGINAL_TS = (1507274980).to_bytes(10, byteorder='big')