# Define the providers information
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-north-1"
}

# VPC
resource "aws_vpc" "pfa_web_app_vpc" {
  cidr_block = "172.16.0.0/16"

  tags = {
    Name = "pfa-web-app-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "pfa_web_app_igw" {
  vpc_id = aws_vpc.pfa_web_app_vpc.id

  tags = {
    Name = "pfa-web-app-igw"
  }
}

# Route Table
resource "aws_route_table" "pfa_web_app_route_table" {
  vpc_id = aws_vpc.pfa_web_app_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.pfa_web_app_igw.id
  }

  tags = {
    Name = "pfa-web-app-route-table"
  }
}

# Subnet
resource "aws_subnet" "pfa_web_app_subnet" {
  vpc_id            = aws_vpc.pfa_web_app_vpc.id
  cidr_block        = "172.16.10.0/24"
  availability_zone = "eu-north-1a"

  tags = {
    Name = "pfa-web-app-subnet"
  }
}

# Route Table Association
resource "aws_route_table_association" "pfa_web_app_rta" {
  subnet_id      = aws_subnet.pfa_web_app_subnet.id
  route_table_id = aws_route_table.pfa_web_app_route_table.id
}

# Security Group
resource "aws_security_group" "pfa_web_app_nsg" {
  vpc_id = aws_vpc.pfa_web_app_vpc.id

  # Allow SSH from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTP from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS from anywhere
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound trafic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "pfa-web-app-nsg"
  }
}

# Network Interface
resource "aws_network_interface" "pfa_web_app_network_interface" {
  subnet_id   = aws_subnet.pfa_web_app_subnet.id
  private_ips = ["172.16.10.100"]

  tags = {
    Name = "pfa-web-app-network-interface"
  }
}

# EC2 Instance
resource "aws_instance" "pfa_web_app_instance" {
  ami           = "ami-0705384c0b33c194c"
  instance_type = "t3.micro"
  key_name      = "aws-aws"

  subnet_id = aws_subnet.pfa_web_app_subnet.id

  security_groups = [aws_security_group.pfa_web_app_nsg.id]

  tags = {
    Name = "pfa-web-app-instance"
  }
}

# Elastic IP
resource "aws_eip" "pfa_web_app_eip" {
  vpc = true
}

# Elastic IP Association
resource "aws_eip_association" "pfa_web_app_eip_association" {
  instance_id      = aws_instance.pfa_web_app_instance.id
  allocation_id    = aws_eip.pfa_web_app_eip.id

  depends_on = [aws_eip.pfa_web_app_eip]
}

# Output
output "instance_public_ip" {
  value = aws_eip.pfa_web_app_eip.public_ip
}

output "instance_private_ip" {
  value = aws_instance.pfa_web_app_instance.private_ip
}
