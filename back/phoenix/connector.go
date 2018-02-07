package phoenix

import (
	"database/sql"
	_ "github.com/Boostport/avatica"
)

var Phoenix *sql.DB

func ConnectAvatica(host string, port string){
	db, err := sql.Open("avatica", "http://" + host + ":" + port)
	if err != nil {
		panic(err)
	}
	Phoenix = db
}
