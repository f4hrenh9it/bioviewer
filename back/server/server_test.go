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

func TestGetProfile(t *testing.T) {
	url := fmt.Sprintf("http://%s:%d/profile/%s/%d", host, port, idp, userid)
	resp, err := http.Get(url)
	util.CheckErr(err)
	profile := new(hbase.BioRegisterProfile)
	json.NewDecoder(resp.Body).Decode(profile)
}
