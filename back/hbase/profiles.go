package hbase

type BioRegisterProfile struct {
	IdpId          string   `json:"idpid"`
	FirstName      string   `json:"firstname"`
	LastName       string   `json:"lastname"`
	SecondName     string   `json:"secondname"`
	Gender         string   `json:"gender"`
	Age            int      `json:"age"`
	PhotosAmount   int      `json:"photos_amount"`
	SoundsAmount   int      `json:"sounds_amount"`
	PhotoOriginals []map[string]interface{} `json:"photos"`
	SoundOriginals []map[string]interface{} `json:"sounds"`
	VerifiesAmount int `json:"verifies_amount"`
	VerifiesConfirmed int `json:"verifies_confirmed"`
	Adaptations int `json:"adaptations"`
}

func NewBioRegisterProfile(
	idpId string,
	firstName string,
	lastName string,
	secondName string,
	gender string, age int,
	photosAmount int,
	soundsAmount int,
	photos []map[string]interface{},
	sounds []map[string]interface{},
	verifiesAmount int,
	verifiesConfirmed int,
	adaptations int,
	) *BioRegisterProfile {
	return &BioRegisterProfile{
		idpId,
		firstName,
		lastName,
		secondName,
		gender,
		age,
		photosAmount,
		soundsAmount,
		photos,
		sounds,
		verifiesAmount,
		verifiesConfirmed,
		adaptations,
	}
}
