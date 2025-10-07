import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";

import { CampusMarketplace } from "../target/types/campus_marketplace";

describe("campus_marketplace", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .campus_marketplace as Program<CampusMarketplace>;

  it("initializes state", async () => {
    const state = Keypair.generate();

    await program.methods
      .initialize()
      .accounts({
        state: state.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([state])
      .rpc();
  });
});
