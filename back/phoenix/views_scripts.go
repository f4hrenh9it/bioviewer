package phoenix

import (
	"github.com/lulunevermind/bioviewer/back/configuration"
	"github.com/lulunevermind/bioviewer/back/logger"
	"io/ioutil"
	"os"
	"strings"
)

func SplitViewCommands(commands []byte) []string {
	spl := strings.Split(string(commands), ";")
	spl = spl[:len(spl)-1]
	return spl
}

func ApplyViews() {
	for _, path := range configuration.C.Views {
		f, err := os.Open(path)
		if err != nil {
			panic(err)
		}
		logger.Slog.Infow("Читаем sql DDL из файла","sqlfile", path)
		view, err := ioutil.ReadAll(f)
		cmds := SplitViewCommands(view)
		for _, cmd := range cmds {
			logger.Slog.Infow("Применяем sql DDL","sql", cmd)
			res := Request(cmd)
			logger.Slog.Infow("Результат DDL sql","sqlResult", res)
		}
		f.Close()
	}
}
