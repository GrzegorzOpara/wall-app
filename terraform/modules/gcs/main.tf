module "gcs" {
    source      = "terraform-google-modules/gcs/google"
    version     = "5.0.0"
    names       = ["${var.project}-${var.env}-bucket"]
    project_id  = "${var.project}"   
}