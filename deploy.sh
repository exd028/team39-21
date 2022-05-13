ssh -o StrictHostKeyChecking=no root@$DIGITAL_OCEAN_IP_ADDRESS << 'ENDSSH'
  cd /app
  export $(cat .env | xargs)
  docker login -u dop_v1_d89a3778b31857fedf98bf63e13360882f79aa670fe4ffddb45194784b54b633 -p dop_v1_d89a3778b31857fedf98bf63e13360882f79aa670fe4ffddb45194784b54b633 registry.digitalocean.com/venture
  docker pull $IMAGE:web
  docker pull $IMAGE:nginx
  docker-compose -f docker-compose.prod.yml up -d
ENDSSH

