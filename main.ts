namespace ikChainExample {
    namespace MySpriteKind {
        export const App = SpriteKind.create();
        export const Mouse = SpriteKind.create();
        export const IKchainn = SpriteKind.create();
        export const IKchain = SpriteKind.create();
        export const App1 = SpriteKind.create();
        export const App2 = SpriteKind.create();
        export const Fire = SpriteKind.create();
    }

    let IK_chain: ikchain.IKChain;

    /**
     * Create and initialize the IK chain example.
     */
    export function createExampleChain() {
        scene.setBackgroundColor(9);

        const base = sprites.create(assets.image`tiefb`, SpriteKind.Player);
        base.setPosition(80, 110);

        const head = sprites.create(assets.image`jet`, MySpriteKind.Mouse);
        head.setScale(0.28, ScaleAnchor.Middle);
        head.setPosition(80, 40);
        controller.moveSprite(head);

        // Create IK Chain
        IK_chain = ikchain.createIKChain(
            907,   // Number of segments
            0.245, // Stiffness
            11,    // Segment length
            2,     // Constraint (maybe angle constraint?)
            head,
            base
        );

        // Preload image to avoid asset overhead
        const egiImage = assets.image`egi`;

        // Super smooth spawn using lazy loading
        let segmentCount = 0;
        game.onUpdateInterval(1, function () {
            if (segmentCount < 907) {
                const segment = sprites.create(egiImage, SpriteKind.Player);
                ikchain.addMidSegmentSprite(IK_chain, segment, segmentCount + 1, 0);
                segmentCount++;
            }
        });

        game.onUpdate(function () {
            ikchain.updateAllChains();
        });
    }
}
