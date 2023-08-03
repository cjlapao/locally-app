import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';

import '../styles/text.dart';

class OutlineRadioButtonItem {
  final String? name;
  final String? value;
  final IconData? icon;
  final Function()? onTap;

  OutlineRadioButtonItem({this.name, this.value, this.icon, this.onTap});
}

class OutlineRadioButton extends StatefulWidget {
  final List<OutlineRadioButtonItem> children;
  final String? title;
  final double? buttonWidth;
  final double? buttonHeight;
  final double? buttonSpacing;
  final Function(OutlineRadioButtonItem)? onChange;
  final MainAxisAlignment? alignment;

  const OutlineRadioButton(
      {super.key,
      required this.children,
      this.title,
      this.onChange,
      this.buttonWidth,
      this.alignment,
      this.buttonHeight,
      this.buttonSpacing});

  @override
  State<OutlineRadioButton> createState() => _OutlineRadioButtonState();
}

class _OutlineRadioButtonState extends State<OutlineRadioButton> {
  int? _activeIndex = -1;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.title != null)
          Text(
            widget.title!,
            style: normalTextStyle(),
          ),
        Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Column(
              children: [
                Row(
                    mainAxisAlignment:
                        widget.alignment ?? MainAxisAlignment.start,
                    children: widget.children.map((item) {
                      return Padding(
                          padding: widget.alignment != null
                              ? const EdgeInsets.only()
                              : EdgeInsets.only(
                                  right: widget.buttonSpacing ?? 10),
                          child: SizedBox(
                            width: widget.buttonWidth ?? 200,
                            height: widget.buttonHeight ?? 64,
                            child: OutlinedButton(
                                onPressed: item.onTap != null
                                    ? () {
                                        setState(() {
                                          _activeIndex =
                                              widget.children.indexOf(item);
                                        });
                                        if (widget.onChange != null) {
                                          widget.onChange!(item);
                                        }
                                        item.onTap!();
                                      }
                                    : null,
                                style: ButtonStyle(
                                    backgroundColor: _activeIndex !=
                                            widget.children.indexOf(item)
                                        ? null
                                        : MaterialStateProperty.all<Color>(
                                            LocallyLightColors
                                                .secondaryButtonFocused)),
                                child: Row(
                                  children: [
                                    if (item.icon != null)
                                      Padding(
                                        padding:
                                            const EdgeInsets.only(right: 10),
                                        child: Icon(item.icon),
                                      ),
                                    Text(item.name ?? '',
                                        style: normalTextStyle(
                                            fontSize: 18,
                                            color: LocallyLightColors
                                                .secondaryButtonText)),
                                  ],
                                )),
                          ));
                    }).toList())
              ],
            )),
      ],
    );
  }
}
