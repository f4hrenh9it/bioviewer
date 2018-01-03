package hbase

// Енум модальностей
type Modality int

const (
	PHOTO Modality = iota
	SOUND
)

var modalities = []string{
	"photo",
	"sound",
}

func (m Modality) String() string { return modalities[m] }

func (m Modality) Bytes() []byte { return []byte(modalities[m])}

// Таблицы и прочие константы
const (
	IDPPREFIX = "ids_"
	ORIGINALPREFIX = "original_"
	TEMPLATEPREFIX = "template_"
)