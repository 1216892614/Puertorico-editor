use clap::Parser;
use ws::listen;

mod cli_prams;
use cli_prams::{Commands, PuertoricoCli};

fn main() {
    let cli = PuertoricoCli::parse();

    match cli.command {
        Commands::Start { port } => todo!(),
    }
}
