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
	Error string `json:"error"`
}

func OptionIdpId(idpId string) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.IdpId = idpId
	}
}

func OptionFirstName(firstName string) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.FirstName = firstName
	}
}

func OptionLastName(lastName string) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.LastName = lastName
	}
}

func OptionSecondName(secondName string) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.SecondName = secondName
	}
}

func OptionGender(gender string) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.Gender = gender
	}
}

func OptionAge(age int) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.Age = age
	}
}

func OptionPhotosAmount(photosAmount int) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.PhotosAmount = photosAmount
	}
}

func OptionSoundsAmount(soundsAmount int) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.SoundsAmount = soundsAmount
	}
}

func OptionPhotoOriginals(photoOriginals []map[string]interface{}) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.PhotoOriginals = photoOriginals
	}
}

func OptionSoundOriginals(soundOriginals []map[string]interface{}) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.SoundOriginals = soundOriginals
	}
}

func OptionVerifiesAmount(verifiesAmount int) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.VerifiesAmount = verifiesAmount
	}
}

func OptionVerifiesConfirmed(verifiesConfirmed int) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.VerifiesConfirmed = verifiesConfirmed
	}
}

func OptionAdaptations(adaptations int) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.Adaptations = adaptations
	}
}

func OptionErrorString(err string) func(*BioRegisterProfile) {
	return func(p *BioRegisterProfile) {
		p.Error = err
	}
}

func NewBioRegisterProfile(opts ...func(*BioRegisterProfile)) *BioRegisterProfile {
	p := &BioRegisterProfile{}
	for _, option := range opts {
		option(p)
	}
	return p
}

//func NewBioRegisterProfile(
//	idpId string,
//	firstName string,
//	lastName string,
//	secondName string,
//	gender string, age int,
//	photosAmount int,
//	soundsAmount int,
//	photos []map[string]interface{},
//	sounds []map[string]interface{},
//	verifiesAmount int,
//	verifiesConfirmed int,
//	adaptations int,
//	err error,
//	) *BioRegisterProfile {
//	return &BioRegisterProfile{
//		idpId,
//		firstName,
//		lastName,
//		secondName,
//		gender,
//		age,
//		photosAmount,
//		soundsAmount,
//		photos,
//		sounds,
//		verifiesAmount,
//		verifiesConfirmed,
//		adaptations,
//		err,
//	}
//}