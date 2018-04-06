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
	"github.com/lulunevermind/bioviewer/back/phoenix"
)

var host = "localhost"
var port = 8082
var idp = "esia"
var userid = 1000349572

//1000318437                                         column=meta:id, timestamp=1522829166280, value=\xDB\x00\x00\x00\x00\x00\x05\x00
//1000318437                                         column=meta:reg_date, timestamp=1522829166280, value=\x00\x00\x01b\x8F\xB0\xFEx
//1000318438                                         column=extended:active, timestamp=1522835211944, value=\xFF
//1000318438                                         column=extended:countFailed, timestamp=1522836274945, value=\x00\x00\x00\x00
//1000318438                                         column=meta:act_date, timestamp=1522835211944, value=\x00\x00\x01b\x90\x0D?\xD9
//1000318438                                         column=meta:id, timestamp=1522835211944, value=\xE4\x00\x00\x00\x00\x00\x05\x00
//1000318438                                         column=meta:reg_date, timestamp=1522835211944, value=\x00\x00\x01b\x90\x0D?\xD9
//1000318443                                         column=extended:active, timestamp=1522839381664, value=\xFF
//1000318443                                         column=extended:countFailed, timestamp=1522840250718, value=\x00\x00\x00\x00
//1000318443                                         column=meta:act_date, timestamp=1522839381664, value=\x00\x00\x01b\x90L\xDD\xDA
//1000318443                                         column=meta:id, timestamp=1522839381664, value=\xEB\x00\x00\x00\x00\x00\x05\x00
//1000318443                                         column=meta:reg_date, timestamp=1522839381664, value=\x00\x00\x01b\x90E\x80\x8C
//1000318449                                         column=extended:active, timestamp=1522839937903, value=\xFF
//1000318449                                         column=extended:countFailed, timestamp=1522841148895, value=\x00\x00\x00\x00
//1000318449                                         column=meta:act_date, timestamp=1522839937903, value=\x00\x00\x01b\x90U\x5C\x86
//1000318449                                         column=meta:id, timestamp=1522839937903, value=\xED\x00\x00\x00\x00\x00\x05\x00
//1000318449                                         column=meta:reg_date, timestamp=1522839937903, value=\x00\x00\x01b\x90U\x5C\x86

func TestMain(m *testing.M) {
	phoenix.ConnectAvatica(
		"fr00nbpnode01",
		"8765",
	)
	r := GetRouter()
	go r.Run("0.0.0.0:" + string(port))
	<-time.After(1 * time.Second)
	os.Exit(m.Run())
}

func TestGetOriginalsRows(t *testing.T) {
	modality := "sound"
	url := fmt.Sprintf("http://%s:%d/originals/rows/%s/%s/%d/", host, port, modality, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	rows := &[]string{}
	json.NewDecoder(resp.Body).Decode(rows)
	assert.Equal(t, 5, len(*rows))
	fmt.Printf("Res = %s", rows)
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

// operations = (iterations x pageSize) = 189 x 25 = 4725
// operations_test = 189 x 25 = 4725
func TestGetStatsOperationsForAllWithPagination(t *testing.T) {
	batchSize := 10
	startRow := "NULL"
	hbase.DeleteFakeOperations()
	hbase.CreateFakeOperations()
	hbase.FillFakeOperations(10000)

	for i := 0; i < 10; i++ {
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

func TestPhoenixRequest(t *testing.T) {
	res := phoenix.Request("select \"base\".* from \"_metadata_for_science\" where \"base\".\"information_system\" = 'TK_UBS_DEV'")
	assert.Equal(t, 127, len(res))
}
