package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lulunevermind/bioviewer/back/hbase"
	"github.com/lulunevermind/bioviewer/back/hbase/stats"
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/lulunevermind/bioviewer/back/util"
	"strconv"
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
	modality := c.Param("modality")
	idp := c.Param("idp")
	id := c.Param("id")
	logger.Slog.Infow("Получаем ключи оригиналов по idp и id",
		"idp", idp,
		"id", id)
	intKey, err := hbase.GetInternalKey(idp, id)
	util.CheckErr(err)
	if modality == "photo" {
		rows := hbase.GetOriginalRows(hbase.PHOTO, intKey)
		c.JSON(200, rows)
	}
	if modality == "sound" {
		rows := hbase.GetOriginalRows(hbase.SOUND, intKey)
		c.JSON(200, rows)
	}
}

func GetOriginal(c *gin.Context) {
	intKey := c.Param("intKey")
	logger.Slog.Infow("Получаем оригинал по ключу",
		"intKey", intKey)
	original := hbase.GetOriginal(hbase.PHOTO, []byte(intKey))
	c.JSON(200, original)
}

func GetStatsOperations(c *gin.Context) {
	idp := c.Param("idp")
	id := c.Param("id")
	rowKeyFrom := c.Param("rowKeyFrom")
	pageSize := c.Param("pageSize")
	pageSizeInt, _ := strconv.ParseInt(pageSize, 10, 64)

	if idp == "" || id == "" {
		if pageSize == "" && rowKeyFrom == "" {
			logger.Slog.Infow("Получаем операции для всех пользователей без пагинации")
			operations := hbase.GetStatsOperations()
			c.JSON(200, operations)
		} else {
			logger.Slog.Infow("Получаем операции для всех пользователей с размером страницы, начиная с ключа",
				"pageSize", pageSize,
					"rowKeyFrom", rowKeyFrom)
			operations := hbase.GetStatsOperations(
				stats.OptionPageFilter(pageSizeInt),
				stats.OptionRowKeyFromFilter(rowKeyFrom),
			)
			c.JSON(200, operations)
		}
	} else {
		intKey, err := hbase.GetInternalKey(idp, id)
		util.CheckErr(err)
		logger.Slog.Infow("Получаем операции по idp и id",
			"idp", idp,
			"id", id)
		operations := hbase.GetStatsOperations(stats.OptionUserPrefixFilter(intKey))
		c.JSON(200, operations)
	}
}
