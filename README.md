# 数据库docker执行命令  

## 构建镜像

``` 
  docker build -t gateway-mongo:0.1 -f dockerfile.mongo .
  docker build -t gateway-redis:0.1 -f dockerfile.redis .
```  

## 运行容器  

```
  docker run -d -p 27017:27017 -v gateway-database-data:/data gateway-mongo:0.1
  docker run -d -p 6379:6379 -v gateway-database-data:/data gateway-redis:0.1
```
