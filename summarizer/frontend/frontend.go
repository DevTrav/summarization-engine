package frontend

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed build/*
var staticFiles embed.FS

//encore:api public raw path=/
func ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fsys, err := fs.Sub(staticFiles, "build")
	if err != nil {
		http.Error(w, "Failed to serve static files", http.StatusInternalServerError)
		return
	}
	http.FileServer(http.FS(fsys)).ServeHTTP(w, r)
}
