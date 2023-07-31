import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:locally/styles/colors.dart';

final buttonColors = WindowButtonColors(
    iconNormal: const Color(0xFF805306),
    mouseOver: const Color(0xFFF6A00C),
    mouseDown: const Color(0xFF805306),
    iconMouseOver: const Color(0xFF805306),
    iconMouseDown: const Color(0xFFFFD500));

final closeButtonColors = WindowButtonColors(
    mouseOver: const Color(0xFFD32F2F),
    mouseDown: const Color(0xFFB71C1C),
    iconNormal: const Color(0xFF805306),
    iconMouseOver: Colors.white);

class TopBar extends StatefulWidget {
  final bool? showIcon;
  final Color? color;

  const TopBar({Key? key, this.showIcon, this.color}) : super(key: key);

  @override
  State<TopBar> createState() => _TopBarState();
}

class _TopBarState extends State<TopBar> {
  final double _height = 50;
  void maximizeOrRestore() {
    setState(() {
      appWindow.maximizeOrRestore();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Container(
        height: _height,
        color: widget.color ?? LocallyColors.lightGrey,
      ),
      if (widget.showIcon ?? true)
        SizedBox(
            height: _height,
            child:
                Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Padding(
                  padding: const EdgeInsets.only(left: 18, top: 5),
                  child: SvgPicture.asset(
                    'assets/images/logo.svg',
                    height: 18,
                  ))
            ])),
      SizedBox(
          height: _height,
          child: WindowTitleBarBox(
              child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: MoveWindow(),
              ),
              Row(
                children: [
                  MinimizeWindowButton(colors: buttonColors),
                  appWindow.isMaximized
                      ? RestoreWindowButton(
                          colors: buttonColors,
                          onPressed: maximizeOrRestore,
                        )
                      : MaximizeWindowButton(
                          colors: buttonColors,
                          onPressed: maximizeOrRestore,
                        ),
                  CloseWindowButton(colors: closeButtonColors),
                ],
              )
            ],
          )))
    ]);
  }
}
