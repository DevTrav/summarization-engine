# PostgreSQL Cluster Helm Chart

A Helm chart for deploying PostgreSQL database for the event service.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- Rancher Desktop

# Installing the Chart


## Install the chart
`make install`

## Check status
`make status`

you should see an ouput like:
```
pod/postgres-cluster-...    1/1     Running
service/postgres-cluster    ClusterIP   5432/TCP
```
## Forward the port:
`kubectl port-forward svc/postgres-cluster 5432:5432 -n event-system`

# Test connection
`kubectl port-forward svc/postgres-cluster 5432:5432 -n event-system`

# Connect to database
`psql -h localhost -U eventuser -d eventdb`


## Configuration

The following table lists the configurable parameters of the postgres-cluster chart:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `1` |
| `image.repository` | PostgreSQL image repository | `postgres` |
| `image.tag` | PostgreSQL image tag | `15` |
| `image.pullPolicy` | Image pull policy | `IfNotPresent` |
| `service.type` | Service type | `ClusterIP` |
| `service.port` | Service port | `5432` |
| `postgresql.username` | PostgreSQL username | `eventuser` |
| `postgresql.password` | PostgreSQL password | `eventpass` |
| `postgresql.database` | PostgreSQL database name | `eventdb` |