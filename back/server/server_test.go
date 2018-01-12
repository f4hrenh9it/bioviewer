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
	"io/ioutil"
	"github.com/lulunevermind/bioviewer/back/hbase/stats"
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

func TestGetOriginalsRows(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/originals/rows/%s/%d/", host, port, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	rows := &[]string{}
	json.NewDecoder(resp.Body).Decode(rows)
	assert.Equal(t, 4, len(*rows))
}

func TestGetCountOriginals(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/originals/rows/%s/%d/", host, port, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	rows := &[]string{}
	json.NewDecoder(resp.Body).Decode(rows)
	assert.Equal(t, 4, len(*rows))
}

func TestGetRegProfile(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d/", host, port, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
	assert.Equal(t, 4, len(profile.PhotoOriginals.Originals))
	assert.Equal(t, 5, len(profile.SoundOriginals.Originals))
	assert.Equal(t, "", profile.Error)
}

func TestGetRegProfileErrorNoUser(t *testing.T) {
	notInHbaseId := 100200100200100200
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d/", host, port, idp, notInHbaseId)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
	assert.Equal(t, "пользователь не зарегистрирован в idp", profile.Error)
}

func TestGetRegProfileErrorNoIdp(t *testing.T) {
	wrongIdp := "vhsbwb3"
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d/", host, port, wrongIdp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
	assert.Equal(t, "таблица idp не найдена в базе", profile.Error)
}

func TestGetStatsOperationsForUserNoPagination(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/stats/operations/%s/%d/", host, port, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	body, err := ioutil.ReadAll(resp.Body)
	assert.Contains(t, string(body), "op_type")
}

func TestGetStatsOperationsForAllNoPagination(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/stats/operations/", host, port)
	resp, err := http.Get(url)
	util.CheckErr(err)
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Printf("Body = %s", body)
}

func TestGetStatsOperationsForAllWithPagination(t *testing.T) {
	batchSize := 50
	startRow := "NULL"

	for i := 0; i < 15; i++ {
		url := fmt.Sprintf("http://%s:%d/stats/operationsPaged/%s/%d/", host, port, startRow, batchSize)
		resp, err := http.Get(url)
		util.CheckErr(err)
		res := stats.NewPageableOperations()
		json.NewDecoder(resp.Body).Decode(res)
		assert.Len(t, res.Operations, batchSize)
		fmt.Printf("[Operations len = %d] [last row = %s]\n", len(res.Operations), res.LastRowKey)
		startRow = string(res.LastRowKey)
	}
}
