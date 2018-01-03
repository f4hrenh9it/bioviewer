package main

import (
	"github.com/lulunevermind/bioviewer/back/server"
	"github.com/lulunevermind/bioviewer/back/logger"
)

func main() {
	r := server.GetRouter(
		server.ZapLoggerInstance(logger.Logger),
		server.WithCors(),
	)
	r.Run()
}
