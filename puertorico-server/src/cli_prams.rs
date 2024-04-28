use clap::{command, Parser, Subcommand};

#[derive(Debug, Parser)]
#[command(name = "puertorico-server")]
#[command(bin_name = "puertorico-server")]
#[command(
    about = "Server part of Puertorico Editor.",
    long_about = "Server part of Puertorico Editor, give Server part of Puertorico Editor file read support and remote plugins execute environment"
)]
pub(super) struct PuertoricoCli {
    #[command(subcommand)]
    pub command: Commands,

    #[arg(
        long = "version",
        short = 'v',
        help = "Get Puertorico Server's version"
    )]
    pub version: Option<String>,
}

#[derive(Debug, Subcommand)]
pub(super) enum Commands {
    Start {
        #[arg(
            long = "port",
            short = 'p',
            default_value = "58203",
            help = "Port to connect Puertorico Server and Puertorico Client"
        )]
        port: Option<usize>,
    },
}
