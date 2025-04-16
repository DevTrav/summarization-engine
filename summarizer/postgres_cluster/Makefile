CHART_DIR := release
RELEASE_NAME := $(shell yq '.name' $(CHART_DIR)/Chart.yaml)
RELEASE_VERSION := $(shell yq '.appVersion' $(CHART_DIR)/Chart.yaml)
RELEASE_IMG := ${RELEASE_NAME}:${RELEASE_VERSION}
RELEASE_PKG := ${RELEASE_NAME}-${RELEASE_VERSION}.tgz

.PHONY: install uninstall upgrade status package clean build

# Build the Docker image for PostgreSQL
build:
	docker build -t ${RELEASE_IMG} .

# Package the Helm chart
package:
	helm package $(CHART_DIR) -d $(CHART_DIR)/releases/
	@echo "Created package: $(CHART_DIR)/releases/${RELEASE_PKG}"

# Install the Helm chart
install:
	helm install ${RELEASE_NAME} $(CHART_DIR) \
		--namespace event-system \
		--create-namespace

# Uninstall the Helm chart
uninstall:
	helm uninstall ${RELEASE_NAME} --namespace event-system

# Upgrade the Helm chart
upgrade:
	helm upgrade ${RELEASE_NAME} $(CHART_DIR) \
		--namespace event-system

# Check the status
status:
	kubectl get pods,svc -n event-system

# Clean up releases directory
clean:
	rm -rf $(CHART_DIR)/releases/*.tgz
