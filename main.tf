module "static-website-cdn" {
  source  = "kumarvna/static-website-cdn/azurerm"
  version = "2.2.0"
  create_resource_group = true
  resource_group_name = "breathbox"
  storage_account_name = "breathbox-static"
  static_website_source_folder = "src"
  enable_cdn_profile = true
  allowed_origins = null
  tags = { app: "breathbox" }
}