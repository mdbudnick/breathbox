module "static-website-cdn" {
  source  = "kumarvna/static-website-cdn/azurerm"
  version = "2.2.0"
  location = "East US"
  create_resource_group = true
  resource_group_name = "breathbox"
  storage_account_name = "sabreathbox"
  static_website_source_folder = "src"
  enable_cdn_profile = true
  cdn_sku_profile = "Standard_Microsoft"
  cdn_profile_name = "breathboxcdn"
  friendly_name = "breathbox"
  allowed_origins = ["breathbox.net"]
  tags = { app: "breathbox" }
}