package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lulunevermind/bioviewer/back/hbase"
	"github.com/lulunevermind/bioviewer/back/logger"
	//"io/ioutil"
)

func GetRegisterProfile(c *gin.Context) {
	idp := c.Param("idp")
	id := c.Param("id")
	logger.Slog.Infow("Получаем профиль по idp и id",
		"idp", idp,
		"id", id)
	intKey, err := hbase.GetInternalKey(idp, id)
	if err != nil {
		// пользователь не зарегистрирован в idp
		profile := hbase.NewBioRegisterProfile(hbase.OptionErrorString(err.Error()))
		c.JSON(200, profile)
	} else {
		photos, errPhotos := hbase.GetOriginals(hbase.PHOTO, intKey) // Начать продумывать разделение по routes
		sounds, errSounds := hbase.GetOriginals(hbase.SOUND, intKey)
		if errPhotos != nil && errSounds != nil {
			c.JSON(200, errPhotos.Error()+"\n"+errSounds.Error())
		} else {
			profile := hbase.NewBioRegisterProfile(
				hbase.OptionIdpId(id),
				hbase.OptionFirstName("Boris"), // где эти данные должны лежать в hbase?
				hbase.OptionLastName("Eltsin"),
				hbase.OptionSecondName("Nikolaevitch"),
				hbase.OptionGender("M"),
				hbase.OptionAge(56),
				hbase.OptionPhotosAmount(len(photos)), // на самом деле должно храниться отдельно ибо подсчитывать каждый раз возможно не
				hbase.OptionSoundsAmount(len(sounds)), // выйдет без сканов или может быть нетривиальным
				hbase.OptionPhotoOriginals(photos),
				hbase.OptionSoundOriginals(sounds),
				hbase.OptionVerifiesAmount(20), // где взять?
				hbase.OptionVerifiesConfirmed(15),
				hbase.OptionAdaptations(0),
			)
			c.JSON(200, profile)
		}
	}
}

func PutRegisterMetaData(c *gin.Context) {

}
