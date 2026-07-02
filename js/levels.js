/* Level data for Redline.
 *
 * Each level is a list of equal-length text rows. One character is one tile.
 * Rows are padded to the widest row when the game loads, so the maps below can
 * have ragged right edges — trailing empty space is filled in for you.
 *
 * Tile legend:
 *   space or '.'  empty air
 *   #             solid block
 *   /             slope rising to the right (floor climbs left->right)
 *   \             slope falling to the right (floor drops left->right)
 *   o             ring
 *   ^             spikes (hurts on contact)
 *   S             spring (launches you straight up)
 *   E             enemy spawn (a patrolling "Bristle")
 *   P             player start
 *   G             goal post (touch it to finish the act)
 *
 * Design note: keep a solid floor under the player's path so slope collision
 * stays simple and forgiving. Backslashes are escaped as needed by JS strings.
 */
(function () {
  const LEVELS = [
    {
      name: "Act 1 — Green Circuit",
      rows: [
        "                                                                        ",
        "                                                                        ",
        "                            o o o                                       ",
        "                          o       o                oo                   ",
        "         o o                                      o  o          G       ",
        "        o   o        E              S           E                #      ",
        "   P   o     o                                           /##\\    #      ",
        "  ##       o        ####         ###        oo      /####      ###      ",
        "  ###/            ##########   #######/    ####\\   #                     ",
        "  ######\\      ##                            ###                         ",
        "  #########  ###          ^^^^                                          ",
        "  ####################  ####################   ########################  ",
        "  ####################  ####################   ########################  ",
        "  ####################  ####################   ########################  ",
      ],
    },
    {
      name: "Act 2 — Rolling Hills",
      rows: [
        "                                                                              ",
        "                        o o o o                                               ",
        "            o o                        S              o o o                   ",
        "           o   o                    E        o o     o     o          G       ",
        "     P    o     o          /##\\             o   o             o       #        ",
        "    ##    o     o     E   /    \\      /##\\  o     o     E   E         #        ",
        "   ###\\       o      /###    ###\\    /    \\        o        /########  #       ",
        "   #####\\    o      #            \\  #      \\      o        #                   ",
        "   #######\\        #     ^^^^^    ##        \\   ##        #                    ",
        "   #########\\   ###                          \\ #        #                     ",
        "   ###########################  ^^^^^^  ########      ###                     ",
        "   ##########################################      #########                  ",
        "   #########################################################################  ",
        "   #########################################################################  ",
      ],
    },
    {
      name: "Act 3 — Spike Factory",
      rows: [
        "                                                                                  ",
        "        o o o                          o o o                                       ",
        "       o     o        S       S       o     o        S                    G        ",
        "  P   o       o                      o       o                E          #         ",
        " ##  o         o    E      E        o         o        /######\\          #         ",
        " ###        o       ##^^^^##       o           o      #        #    /####  #        ",
        " ####\\     o       #        #     o    ^^^^^   o     #          #   #                ",
        " ######\\          #   oo     #   #             #   #            \\  #                 ",
        " ########\\  ##### #  ####    ## #    ^^^^^^^    # #    ^^^^^^^^    ##                 ",
        " #########################  ############   ##########          #####                ",
        " ########################   ###########    #########    ############                ",
        " ##################################################################################  ",
        " ##################################################################################  ",
        " ##################################################################################  ",
      ],
    },
  ];

  window.LEVELS = LEVELS;
})();
