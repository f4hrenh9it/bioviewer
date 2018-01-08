package server

import (
	"testing"
	"net/http"
	"fmt"
	"time"
	"os"

	"github.com/lulunevermind/bioviewer/back/util"
	"github.com/lulunevermind/bioviewer/back/hbase"
	"encoding/json"
	"github.com/stretchr/testify/assert"
)

var host = "localhost"
var port = 8080
var idp = "esia"
var userid = 1000349572
//var userid = 240631324

func TestMain(m *testing.M) {
	r := GetRouter()
	go r.Run()
	<-time.After(1 * time.Second)
	os.Exit(m.Run())
}

func TestGetRegProfile(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d", host, port, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
	assert.Equal(t, 4, len(profile.PhotoOriginals))
	assert.Equal(t, 5, len(profile.SoundOriginals))
	assert.Equal(t, "", profile.Error)
}

func TestGetRegProfileErrorNoUser(t *testing.T) {
	notInHbaseId := 100200100200100200
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d", host, port, idp, notInHbaseId)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
	assert.Equal(t, "пользователь не зарегистрирован в idp", profile.Error)
}

func TestGetRegProfileErrorNoIdp(t *testing.T) {
	wrongIdp := "vhsbwb3"
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d", host, port, wrongIdp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
	assert.Equal(t, "таблица idp не найдена в базе", profile.Error)
}
