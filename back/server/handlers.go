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
	logger.Slog.Infow("Getting profile by idp and id",
		"idp", idp,
		"id", id)
	intKey, err := hbase.GetInternalKey(idp, id)
	util.CheckErr(err)
	photos, errPhotos := hbase.GetOriginals(hbase.PHOTO, intKey)
	sounds, errSounds := hbase.GetOriginals(hbase.SOUND, intKey)
	profile := hbase.NewBioRegisterProfile(id, photos, sounds)
	if err != nil && errSounds != nil {
		c.JSON(200, errPhotos.Error() + "\n" + errSounds.Error())
	} else {
		c.JSON(200, profile)
	}
}
