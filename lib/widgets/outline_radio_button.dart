import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';

import '../styles/text.dart';
import 'outline_radio_button_item.dart';

class OutlineRadioButton extends FormField<String> {
  final List<OutlineRadioButtonItem> children;
  final String? title;
  final double? buttonWidth;
  final double? buttonHeight;
  final double? buttonSpacing;
  final TextEditingController? controller;
  final Function(OutlineRadioButtonItem)? onChange;
  final MainAxisAlignment? alignment;

  OutlineRadioButton({
    Key? key,
    String? initialValue,
    required this.children,
    this.title,
    this.onChange,
    this.buttonWidth,
    this.alignment,
    this.buttonHeight,
    this.buttonSpacing,
    this.controller,
    FormFieldSetter<String>? onSaved,
    FormFieldValidator<String>? validator,
    String? restorationId,
  }) : super(
          key: key,
          initialValue:
              controller != null ? controller.text : (initialValue ?? ""),
          onSaved: onSaved,
          validator: validator,
          restorationId: restorationId,
          builder: (FormFieldState<String> field) {
            final OutlineRadioButtonState state =
                field as OutlineRadioButtonState;
            return UnmanagedRestorationScope(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (title != null)
                    Text(
                      title,
                      style: normalTextStyle(),
                    ),
                  Padding(
                    padding: const EdgeInsets.only(top: 6),
                    child: Row(
                      mainAxisAlignment: alignment ?? MainAxisAlignment.start,
                      children: children.map((item) {
                        return Padding(
                          padding: alignment != null
                              ? const EdgeInsets.only()
                              : EdgeInsets.only(right: buttonSpacing ?? 10),
                          child: SizedBox(
                            width: buttonWidth ?? 200,
                            height: buttonHeight ?? 64,
                            child: OutlinedButton(
                                onPressed: item.onTap != null
                                    ? () {
                                        state.didChange(item.value!);
                                        if (onChange != null) {
                                          onChange(item);
                                        }
                                      }
                                    : null,
                                style: ButtonStyle(
                                    backgroundColor: state.activeIndex !=
                                            children.indexOf(item)
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
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                  if (field.hasError)
                    Text(
                      field.errorText!,
                      style: TextStyle(color: Colors.red),
                    ),
                ],
              ),
            );
          },
        );

  @override
  OutlineRadioButtonState createState() => OutlineRadioButtonState();
}

class OutlineRadioButtonState extends FormFieldState<String> {
  int activeIndex = -1;

  @override
  void initState() {
    super.initState();
    if (widget.controller != null) {
      widget.controller!.addListener(_handleControllerChanged);
    }
    if (widget.initialValue != null && widget.initialValue!.isNotEmpty) {
      activeIndex = widget.children.indexOf(widget.children
          .firstWhere((element) => element.value == widget.initialValue));
    }
  }

  void _handleControllerChanged() {
    // we could add some extra functionality, for now empty
  }

  @override
  OutlineRadioButton get widget => super.widget as OutlineRadioButton;

  @override
  void didChange(String? value) {
    setState(() {
      widget.controller?.text = value!;
      activeIndex = widget.children.indexOf(
          widget.children.firstWhere((element) => element.value == value));
    });
    super.didChange(value);
  }

  @override
  void reset() {
    activeIndex = -1;
    super.reset();
  }
}
