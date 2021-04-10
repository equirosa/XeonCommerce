{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = with pkgs;[
    dotnet-sdk_3
    dotnetCorePackages.netcore_3_1
    dotnetCorePackages.aspnetcore_3_1
    nodejs
  ];
}
