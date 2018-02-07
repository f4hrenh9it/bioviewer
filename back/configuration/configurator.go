package configuration

import (
	"io/ioutil"
	"fmt"
	"os"
	"log"
	"gopkg.in/yaml.v2"
)

var C *Configuration

type Configuration struct {
	PhoenixHostName string   `yaml:"phoenix_host_name"`
	PhoenixPort     string   `yaml:"phoenix_port"`
	Views           []string `yaml:"views"`
}

func LoadConfiguration(configPath string) {
	content, err := ioutil.ReadFile(configPath)
	if err != nil {
		fmt.Printf(err.Error() + "\n")
		os.Exit(0)
	}
	unmarshalErr := yaml.Unmarshal([]byte(content), &C)
	if unmarshalErr != nil {
		log.Printf("Ошибка разбора: %s", unmarshalErr.Error())
	}
}
