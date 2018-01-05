package hbase

import (
	"github.com/tsuna/gohbase"
)

var client gohbase.Client
var adminClient gohbase.AdminClient

func init() {
	client = gohbase.NewClient("fr00nbpadm01,fr00nbphbase02,fr00nbphbase01",
		gohbase.ZookeeperRoot("/hbase-unsecure"))
	adminClient = gohbase.NewAdminClient("fr00nbphbase01")
}
