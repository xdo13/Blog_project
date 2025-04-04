#!/bin/bash

# 현재 활성 환경 확인 (blue가 기본)
ACTIVE_CONTAINER=$(docker ps --filter "name=blue" --format "{{.Names}}")

if [ "$ACTIVE_CONTAINER" == "blue" ]; then
    NEW_CONTAINER="green"
    OLD_CONTAINER="blue"
    NEW_PORT="9091"  # Green의 외부 포트
else
    NEW_CONTAINER="blue"
    OLD_CONTAINER="green"
    NEW_PORT="9090"  # Blue의 외부 포트
fi

echo "현재 활성 컨테이너: $ACTIVE_CONTAINER"
echo "새로 배포할 컨테이너: $NEW_CONTAINER"

# 1. 새 컨테이너 빌드 및 실행
docker-compose build $NEW_CONTAINER
docker-compose up -d $NEW_CONTAINER

# 2. 새 컨테이너가 정상적으로 실행되는지 확인
# 헬스 체크 반복 시도 (최대 60초)
ATTEMPTS=12
for i in $(seq 1 $ATTEMPTS); do
    echo "헬스 체크 시도 $i/$ATTEMPTS..."
    HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$NEW_PORT/actuator/health)
    if [ "$HEALTH_CHECK" -eq "200" ]; then
        echo "헬스 체크 성공!"
        break
    fi
    sleep 5
done

if [ "$HEALTH_CHECK" -ne "200" ]; then
    echo "새 컨테이너($NEW_CONTAINER) 상태 확인 실패. 배포 중단."
    docker-compose stop $NEW_CONTAINER
    exit 1
fi

# 3. Nginx 설정 업데이트 (새 컨테이너로 트래픽 전환)
sed -i "s/server $OLD_CONTAINER:9090;/server $OLD_CONTAINER:9090 backup;/" nginx.conf
sed -i "s/server $NEW_CONTAINER:9090 backup;/server $NEW_CONTAINER:9090;/" nginx.conf
docker exec -it nginx nginx -s reload

# 4. 이전 컨테이너 중지
docker-compose stop $OLD_CONTAINER

echo "배포 완료: $NEW_CONTAINER이 활성 상태입니다."