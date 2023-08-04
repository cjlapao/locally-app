import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

class LocallyTextFormField extends StatelessWidget {
  final String? name;
  final String? helperText;
  final double? width;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final Function(String?)? onSaved;
  final Function(String?)? onChanged;
  final Function(PointerDownEvent)? onTapOutside;
  final AutovalidateMode? autovalidateMode;

  const LocallyTextFormField(
      {Key? key,
      this.name,
      this.helperText,
      this.controller,
      this.validator,
      this.onSaved,
      this.onChanged,
      this.onTapOutside,
      this.width,
      this.autovalidateMode})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (name != null)
        Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Text(name!, style: normalTextStyle())),
      if (width != null)
        SizedBox(
            height: 38,
            width: width,
            child: TextFormField(
              autovalidateMode: autovalidateMode,
              controller: controller,
              validator: validator,
              onChanged: onChanged,
              onTapOutside: onTapOutside,
              onSaved: onSaved,
            )),
      if (width == null)
        TextFormField(
          autovalidateMode: autovalidateMode,
          controller: controller,
          validator: validator,
          onChanged: onChanged,
          onTapOutside: onTapOutside,
          onSaved: onSaved,
        ),
      if (helperText != null)
        Padding(
            padding: const EdgeInsets.only(top: 10),
            child: Text(helperText!, style: captionTextStyle())),
    ]);
  }
}
