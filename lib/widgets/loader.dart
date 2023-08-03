import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';

@immutable
class LoadingScreen extends StatelessWidget {
  final double blur = 3; //300
  final double opacity = 200; //100
  final double? height;
  final double? width;

  const LoadingScreen({super.key, this.height, this.width});

  @override
  Widget build(BuildContext context) {
    // final double screenHeight = MediaQuery.of(context).size.height;
    final double screenWidth = MediaQuery.of(context).size.width;
    final double messageWidth = width != null ? width! : screenWidth - 50;
    final double messageHeight = height ?? 300;

    bool isVisible = true;

    return Stack(
      children: [
        if (isVisible)
          ClipRect(
              child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
            child: Container(
              decoration: BoxDecoration(
                  color: Color.fromRGBO(0, 0, 0, opacity),
                  borderRadius: BorderRadius.circular(10)),
            ),
          )),
        if (isVisible)
          Center(
              child: Container(
                  alignment: Alignment.center,
                  width: messageWidth,
                  height: messageHeight,
                  child: const CircularProgressIndicator(
                    color: LocallyLightColors.primary,
                  )))
      ],
    );
  }
}
