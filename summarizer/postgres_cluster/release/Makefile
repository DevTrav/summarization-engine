# Get chart details using yq
RELEASE_NAME := $(shell yq '.name' Chart.yaml)
RELEASE_VERSION := $(shell yq '.appVersion' Chart.yaml)
RELEASE_IMG := ${RELEASE_NAME}:${RELEASE_VERSION}
RELEASE_PKG := ${RELEASE_NAME}-${RELEASE_VERSION}.tgz

.PHONY: install uninstall upgrade status package

# Package the Helm chart
package:
	helm package . -d releases/
	@echo "Created package: releases/${RELEASE_PKG}"

# Install the Helm chart
install:
	helm install ${RELEASE_NAME} . \
		--namespace event-system \
		--create-namespace

# Uninstall the Helm chart
uninstall:
	helm uninstall ${RELEASE_NAME} --namespace event-system

# Upgrade the Helm chart
upgrade:
	helm upgrade ${RELEASE_NAME} . \
		--namespace event-system

# Check the status
status:
	kubectl get pods,svc -n event-system

# Clean up releases directory
clean:
	rm -rf releases/*.tgz