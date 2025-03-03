package monitor

import (
	"context"
	"testing"
)

func TestPing(t *testing.T) {
	ctx := context.Background()
	tests := []struct {
		URL string
		Up  bool
	}{
		{"encore.dev", true},
		{"google.com", true},
		// test both with and without "https://" prefix
		{"httpbin.org/status/200", true},
		{"https://httpbin.org/status/200", true},
		//4xx, 5xx status codes are considered down
		{"httpbin.org/status/400", false},
		{"https://httpbin.org/status/500", false},
		// test non-existent site
		{"httpnin.org/nonexistent", false},
		{"https://httpnin.org/nonexistent", false},
		// Invalid URLs should be considered down
		{"invalid://scheme", false},
	}

	for _, test := range tests {
		resp, err := Ping(ctx, test.URL)
		if err != nil {
			t.Errorf("url %s: unexpected error: %v", test.URL, err)
		} else if resp.Up != test.Up {
			t.Errorf("url %s: got up=%v, want %v", test.URL, resp.Up, test.Up)
		}
	}
}
