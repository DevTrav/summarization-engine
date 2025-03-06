package monitor

import (
	"context"

	"encore.app/site"
	"encore.dev/storage/sqldb"
)

// Check checks if a site is up
//
//encore:api public method=POST path=/check/:siteID
func Check(ctx context.Context, siteID int) error {
	site, err := site.Get(ctx, siteID)
	if err != nil {
		return err
	}
	result, err := Ping(ctx, site.URL)
	if err != nil {
		return err
	}
	_, err = db.Exec(ctx,
		`INSERT INTO checks (site_id, up, checked_at)
		VALUES ($1, $2, NOW())`,
		site.ID, result.Up)
	return err
}

// Define a DB named monitor, using database migrations
// in the "./migrations" directory.
// Encore automatically provisions, migrates and connects to the db.
var db = sqldb.NewDatabase("monitor", sqldb.DatabaseConfig{
	Migrations: "./migrations",
})
