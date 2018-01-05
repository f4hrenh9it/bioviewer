package hbase

type BioRegisterProfile struct {
	IdpId          string   `json:"idpid"`
	FirstName      string   `json:"firstname"`
	LastName       string   `json:"lastname"`
	SecondName     string   `json:"secondname"`
	Gender         string   `json:"gender"`
	Age            int      `json:"age"`
	PhotoOriginals [][]byte `json:"photos"`
	SoundOriginals [][]byte `json:"sounds"`
}

func NewBioRegisterProfile(idpId string, firstName string, lastName string, secondName string, gender string, age int, photos [][]byte, sounds [][]byte) *BioRegisterProfile {
	return &BioRegisterProfile{
		idpId,
		firstName,
		lastName,
		secondName,
		gender,
		age,
		photos,
		sounds,
	}
}

type BioVerifyProfile struct {
	Name          string
	PhotoOriginal []byte
	SoundOriginal []byte
	//TODO: Определить форму профиля для верификации
}
