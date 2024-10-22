package storage

import (
	"time"

	"github.com/gofiber/fiber/v2/middleware/session"
)

var store = session.New(
	session.Config{
		Expiration: 20 * time.Minute,
	})

func GetStorage() *session.Store {
	return store
}
