package hbase

import (
	"github.com/tsuna/gohbase"
)

var Client gohbase.Client
var AdminClient gohbase.AdminClient

func init() {
	Client = gohbase.NewClient("fr00nbpadm01,fr00nbphbase02,fr00nbphbase01",
		gohbase.ZookeeperRoot("/hbase-unsecure"))
	AdminClient = gohbase.NewAdminClient("fr00nbphbase01")
}
