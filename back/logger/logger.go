package logger

import "go.uber.org/zap"

var Logger *zap.Logger
var Slog *zap.SugaredLogger

func init() {
	Logger, _ = zap.NewProduction()
	defer Logger.Sync()
	Slog = Logger.Sugar()
}
