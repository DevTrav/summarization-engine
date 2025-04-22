TRAEFIK_RELEASE := $(shell yq '.version | (split(".")|join("-"))' traefik-helm-chart/traefik/Chart.yaml)

.PHONY: package install

package:
	helm package traefik-helm-chart/traefik

install:
	helm upgrade --install v${TRAEFIK_RELEASE} traefik-helm-chart/traefik