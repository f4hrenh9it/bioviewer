package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lulunevermind/bioviewer/back/hbase"
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/lulunevermind/bioviewer/back/util"
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
		photosFuture := make(chan *hbase.OriginalsFuture)
		soundsFuture := make(chan *hbase.OriginalsFuture)
		go hbase.GetOriginals(hbase.PHOTO, intKey, photosFuture) // Начать продумывать разделение по routes
		go hbase.GetOriginals(hbase.SOUND, intKey, soundsFuture)
		photos := <-photosFuture
		sounds := <-soundsFuture

		profile := hbase.NewBioRegisterProfile(
			hbase.OptionIdpId(id),
			hbase.OptionFirstName("Boris"), // где эти данные должны лежать в hbase?
			hbase.OptionLastName("Eltsin"),
			hbase.OptionSecondName("Nikolaevitch"),
			hbase.OptionGender("M"),
			hbase.OptionAge(56),
			hbase.OptionPhotosAmount(len(photos.Originals)), // на самом деле должно храниться отдельно ибо подсчитывать каждый раз возможно не
			hbase.OptionSoundsAmount(len(sounds.Originals)), // выйдет без сканов или может быть нетривиальным
			hbase.OptionPhotoOriginals(photos),
			hbase.OptionSoundOriginals(sounds),
			hbase.OptionVerifiesAmount(20), // где взять?
			hbase.OptionVerifiesConfirmed(15),
			hbase.OptionAdaptations(0),
		)
		c.JSON(200, profile)
	}
}

func GetOriginalsRows(c *gin.Context) {
	idp := c.Param("idp")
	id := c.Param("id")
	logger.Slog.Infow("Получаем ключи оригиналов по idp и id",
		"idp", idp,
		"id", id)
	intKey, err := hbase.GetInternalKey(idp, id)
	util.CheckErr(err)
	rows := hbase.GetOriginalRows(hbase.PHOTO, intKey)
	c.JSON(200, rows)
}
