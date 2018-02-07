package main

import (
	"github.com/lulunevermind/bioviewer/back/server"
	"github.com/lulunevermind/bioviewer/back/logger"
	"github.com/lulunevermind/bioviewer/back/phoenix"
	"github.com/lulunevermind/bioviewer/back/configuration"
	"fmt"
	"os"
	"flag"
)

func main() {
	var config string
	flag.StringVar(&config, "config", "", "конфигурационный файл")
	flag.Parse()
	if config == "" {
		fmt.Printf("укажите конфигурационный файл bioviewer yml\n")
		os.Exit(0)
	}

	configuration.LoadConfiguration(config)
	phoenix.ConnectAvatica(
		configuration.C.PhoenixHostName,
		configuration.C.PhoenixPort,
	)
	phoenix.ApplyViews()
	r := server.GetRouter(
		server.ZapLoggerInstance(logger.Logger),
		server.WithCors(),
	)
	r.Run()
}
