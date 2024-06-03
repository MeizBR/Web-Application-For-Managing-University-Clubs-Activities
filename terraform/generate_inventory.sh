#!/bin/bash
cat <<EOF > hosts.ini
[web]
$(terraform output -raw instance_public_ip) ansible_user=ubuntu ansible_ssh_private_key_file=/home/meiezbr/Downloads/aws-aws.pem
EOF