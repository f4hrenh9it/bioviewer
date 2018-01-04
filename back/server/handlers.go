package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lulunevermind/bioviewer/back/hbase"
	"github.com/lulunevermind/bioviewer/back/logger"
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
		c.JSON(200, err.Error())
	} else {
		photos, errPhotos := hbase.GetOriginals(hbase.PHOTO, intKey)
		sounds, errSounds := hbase.GetOriginals(hbase.SOUND, intKey)
		profile := hbase.NewBioRegisterProfile(id, photos, sounds)
		if errPhotos != nil && errSounds != nil{
			logger.Slog.Infow("HERE!!!!")
			c.JSON(200, errPhotos.Error() + "\n" + errSounds.Error())
		} else {
			c.JSON(200, profile)
		}
	}
}
