import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/loader.dart';

class ModalWindow extends StatefulWidget {
  final bool isLoading;
  final Widget? child;
  final String title;
  final String subtitle;
  const ModalWindow(
      {super.key,
      required this.child,
      this.title = "",
      this.subtitle = "",
      this.isLoading = false});

  @override
  State<ModalWindow> createState() => _ModalWindowState();
}

class _ModalWindowState extends State<ModalWindow> {
  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      if (widget.isLoading)
        Container(
          color: LocallyLightColors.white,
          child: const LoadingScreen(),
        ),
      if (!widget.isLoading)
        Card(
          shadowColor: LocallyLightColors.black,
          elevation: 6,
          surfaceTintColor: LocallyLightColors.primary,
          color: LocallyLightColors.defaultBackground,
          shape: RoundedRectangleBorder(
              side: const BorderSide(
                  color: LocallyLightColors.darkerBackground, width: 0.3),
              borderRadius: BorderRadius.circular(10)),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (widget.title.isNotEmpty && widget.subtitle.isNotEmpty)
                Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10),
                    ),
                    color: LocallyLightColors.darkerBackground,
                  ),
                  width: MediaQuery.of(context).size.width,
                  height: 88,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (widget.title.isNotEmpty)
                        Padding(
                            padding: const EdgeInsets.only(left: 25),
                            child: Text(widget.title, style: h1TextStyle())),
                      if (widget.title.isNotEmpty)
                        Padding(
                            padding: const EdgeInsets.only(left: 25),
                            child: Text(widget.subtitle,
                                style: normalTextStyle())),
                    ],
                  ),
                ),
              Expanded(
                  child: Container(
                      width: MediaQuery.of(context).size.width,
                      decoration: const BoxDecoration(
                        color: LocallyLightColors.defaultBackground,
                        borderRadius: BorderRadius.only(
                          bottomLeft: Radius.circular(10),
                          bottomRight: Radius.circular(10),
                        ),
                      ),
                      child: widget.child))
            ],
          ),
        )
    ]);
  }
}
