package server

import (
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/zap"
	"go.uber.org/zap"
	"github.com/gin-contrib/cors"
)

func ZapLoggerInstance(inst *zap.Logger) func(*gin.Engine) {
	return func(r *gin.Engine) {
		r.Use(ginzap.Ginzap(inst, time.RFC3339, true))
	}
}

func WithCors() func(*gin.Engine) {
	return func(r *gin.Engine) {
		r.Use(cors.Default())
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