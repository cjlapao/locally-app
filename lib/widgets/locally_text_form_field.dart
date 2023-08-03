import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

class LocallyTextFormField extends StatelessWidget {
  final String? name;
  final String? helperText;
  final double? width;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final Function(String?)? onSaved;

  const LocallyTextFormField(
      {Key? key,
      this.name,
      this.helperText,
      this.controller,
      this.validator,
      this.onSaved,
      this.width})
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
            width: width,
            child: TextFormField(
              controller: controller,
              validator: validator,
              onSaved: onSaved,
            )),
      if (width == null)
        TextFormField(
          controller: controller,
          validator: validator,
          onSaved: onSaved,
        ),
      if (helperText != null)
        Padding(
            padding: const EdgeInsets.only(top: 10),
            child: Text(helperText!, style: smallTextStyle())),
    ]);
  }
}
