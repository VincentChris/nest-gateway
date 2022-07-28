# 数据库docker执行命令  

## 构建镜像

``` 
  docker build -t nest-gateway:0.1 .
```  

## 运行容器  

```
  docker run -d -p 27017:27017 -v gateway-mongo-data:/data/db -v gateway-mongo-config:/data/configdb  nest-gateway:0.1
```
