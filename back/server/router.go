package server

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/zap"
	"time"
	"go.uber.org/zap"
)

func ZapLoggerInstance(inst *zap.Logger) func(*gin.Engine) {
	return func(r *gin.Engine) {
		r.Use(ginzap.Ginzap(inst, time.RFC3339, true))
	}
}

func GetRouter(opts ...func(*gin.Engine)) *gin.Engine {
	r := gin.New()

	for _, opt := range opts {
		opt(r)
	}

	r.Use(gin.Recovery())

	v1 := r.Group("/")
	{
		v1.GET("/profile/:idp/:id", GetRegisterProfile)
	}

	return r
}